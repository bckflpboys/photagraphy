import * as yup from 'yup';

export const reviewSchema = yup.object({
  booking: yup.string().required(),
  rating: yup.number().min(1).max(5).required(),
  title: yup.string().required(),
  content: yup.string().required(),
  photos: yup.array().of(
    yup.object({
      url: yup.string().required(),
      caption: yup.string(),
    })
  ),
});

export const reviewResponseSchema = yup.object({
  content: yup.string().required(),
});

export const reviewReportSchema = yup.object({
  reason: yup.string().required(),
});
