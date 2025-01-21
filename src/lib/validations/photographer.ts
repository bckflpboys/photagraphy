import * as yup from 'yup';

export const photographerSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string(),
  bio: yup.string(),
  specialties: yup.array().of(yup.string()).min(1).required(),
  experience: yup.number().min(0).required(),
  priceRange: yup.object({
    min: yup.number().required(),
    max: yup.number().required(),
    currency: yup.string().default('USD'),
  }),
  location: yup.object({
    coordinates: yup.array().of(yup.number()).length(2).required(),
    address: yup.string().required(),
  }),
  availability: yup.object({
    status: yup.string().oneOf(['available', 'busy', 'away']).default('available'),
    schedule: yup.array().of(
      yup.object({
        day: yup
          .string()
          .oneOf([
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
          ])
          .required(),
        slots: yup.array().of(
          yup.object({
            start: yup.string().required(),
            end: yup.string().required(),
          })
        ),
      })
    ),
  }),
});
