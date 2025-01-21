import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  conversation: Schema.Types.ObjectId;
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  content: string;
  attachments?: {
    type: 'image' | 'document';
    url: string;
    name: string;
    size?: number;
  }[];
  status: 'sent' | 'delivered' | 'read';
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IConversation extends Document {
  participants: Schema.Types.ObjectId[];
  lastMessage: Schema.Types.ObjectId;
  unreadCount: {
    [participantId: string]: number;
  };
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    conversation: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    attachments: [{
      type: { type: String, enum: ['image', 'document'], required: true },
      url: { type: String, required: true },
      name: { type: String, required: true },
      size: Number,
    }],
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read'],
      default: 'sent',
    },
    readAt: Date,
  },
  {
    timestamps: true,
  }
);

const ConversationSchema = new Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    unreadCount: {
      type: Map,
      of: Number,
      default: {},
    },
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
MessageSchema.index({ conversation: 1, createdAt: -1 });
MessageSchema.index({ sender: 1, receiver: 1 });
MessageSchema.index({ status: 1 });

ConversationSchema.index({ participants: 1 });
ConversationSchema.index({ status: 1 });
ConversationSchema.index({ updatedAt: -1 });

export const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
export const Conversation = mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', ConversationSchema);
