import { body } from "express-validator";

export const registerValidation = [
    body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({min:3,max:20}).withMessage('Name must be between 3 and 20 characters'),


    body('email')
    .isEmail().withMessage('Email is required')
    .normalizeEmail(),


    body('password').isLength({min:6 , max:20}).withMessage('Password must be 6 to 20 characters long')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter'),
];

export const loginValidation = [
    body('email')
    .isEmail().withMessage('Email is required')
    .normalizeEmail(),

    body('password')
    .isLength({min:6 , max:20}).withMessage('Password must be 6 to 20 characters long')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter'),
]