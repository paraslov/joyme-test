import { body } from 'express-validator'

export const dailiesValidations = {
  title: body('title').isLength({ min: 3, max: 30 }).withMessage('Title should be from 3 to 30 symbols'),
  exp: body('exp').isNumeric().custom(value => {
      if (value < 1) {
        throw new Error('Exp should be above zero')
      }
      return true
    }),
}
