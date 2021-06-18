// import { Column, Entity, ObjectIdColumn } from 'typeorm';
// import { Schema as MongoSchema, model } from 'mongoose';

// const Schema = new MongoSchema({
//   number: { type: Number },
//   sell_value: { type: Number },
//   client_name: { type: String },
//   date: { type: Date },
// });

// export const ConsolidationSchema = model('consolidations', Schema);

// @Entity({ name: 'consolidations' })
// export class Consolidation {
//   @ObjectIdColumn()
//   id: number;

//   @Column({
//     type: 'number',
//   })
//   number: number;

//   @Column({
//     type: 'number',
//   })
//   sell_value: number;

//   @Column({
//     type: 'string',
//   })
//   client_name: string;

//   @Column({
//     type: 'date',
//   })
//   date: any;
// }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConsolidationDocument = Consolidation & Document;

@Schema()
export class Consolidation {
  @Prop({ type: Number })
  number: number;

  @Prop({ type: Number })
  sell_value: number;

  @Prop({ type: String })
  client_name: string;

  @Prop({ type: Date })
  date: any;
}

export const ConsolidationSchema = SchemaFactory.createForClass(Consolidation);
