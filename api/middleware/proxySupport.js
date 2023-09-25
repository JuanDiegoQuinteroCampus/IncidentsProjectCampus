import 'reflect-metadata';
import express from "express";
import { plainToClass, classToPlain } from 'class-transformer';
import { validate } from 'class-validator';
import { validationResult } from 'express-validator';
// import { DTO } from "../helpers/token.js";
import { Router } from "express";
import { SupportDTO } from '../dtocontroller/support.js';
import { parametro } from '../validator/params.js';

const middlewareVerify = Router();
const DTOData = Router();
const proxySupport = express();
const middlewareParamSupports = Router();

proxySupport.use(async (req, res, next) => {
  try {
    const data = plainToClass(SupportDTO, req.body, { excludeExtraneousValues: true });
    const validationErrors = await validate(data);
    if (validationErrors.length > 0) {
      const errors = validationErrors.map((err) => Object.values(err.constraints));
      res.status(400).json({ message: "Validation error", errors });
    } else {
      req.body = JSON.parse(JSON.stringify(data));
      next();
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

middlewareVerify.use((req, res, next) => {
  if (!req.rateLimit) return;
  let { payload } = req.data;
  const { iat, exp, ...newPayload } = payload;
  payload = newPayload;
  const payloadDateObjects = {
    ...payload,
    date: new Date(payload.date),
    solution_date: new Date(payload.solution_date),
    created_date: new Date(payload.created_date),
    update_date: new Date(payload.update_date),
    delete_date: new Date(payload.delete_date)
  };
  const Clone = {
    ...payload,
    date: new Date(payload.date),
    solution_date: new Date(payload.solution_date),
    created_date: new Date(payload.created_date),
    update_date: new Date(payload.update_date),
    delete_date: new Date(payload.delete_date)
    
  };
  const Verify = JSON.stringify(Clone).replace(/\s+/g, '') === JSON.stringify(payloadDateObjects).replace(/\s+/g, '');
  req.data = undefined;
  if (!Verify) {
    console.log("No Autorizado");
    res.status(406).send({ status: 406, message: "No Autorizado" });
  } else {
    console.log("Autorizado");
    next();
  }
});

DTOData.use(async (req, res, next) => {
  try {
    let data = plainToClass(DTO("support").class, req.body);
    await validate(data);
    req.body = JSON.parse(JSON.stringify(data));
    req.data = undefined;
    next();
  } catch (err) {
    res.status(err.status).send(err)
  }
});

middlewareParamSupports.use(parametro, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
});

export {
  middlewareVerify,
  DTOData,
  proxySupport,
  middlewareParamSupports
};