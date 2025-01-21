import * as yup from 'yup';

export const messageSchema = yup.object({
  receiver: yup.string().required(),
  content: yup.string().required(),
  attachments: yup.array().of(
    yup.object({
      type: yup.string().oneOf(['image', 'document']).required(),
      url: yup.string().required(),
      name: yup.string().required(),
      size: yup.number(),
    })
  ),
});

export const conversationSchema = yup.object({
  participants: yup.array().of(yup.string()).min(2).max(2).required(),
});
