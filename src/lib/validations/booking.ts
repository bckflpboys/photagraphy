import * as yup from 'yup';

export const bookingSchema = yup.object({
  photographer: yup.string().required(),
  service: yup.object({
    name: yup.string().required(),
    price: yup.number().required(),
    currency: yup.string().required(),
    duration: yup.number().required(),
  }),
  dateTime: yup.object({
    start: yup.date().required(),
    end: yup.date().required(),
  }),
  location: yup.object({
    coordinates: yup.array().of(yup.number()).length(2).required(),
    address: yup.string().required(),
  }),
  clientCount: yup.number().min(1).required(),
  specialRequests: yup.string(),
});

export const bookingUpdateSchema = bookingSchema.shape({
  status: yup.string().oneOf(['pending', 'confirmed', 'completed', 'cancelled']),
  cancellation: yup.object({
    reason: yup.string().required(),
    cancelledBy: yup.string().oneOf(['client', 'photographer']).required(),
  }),
});
