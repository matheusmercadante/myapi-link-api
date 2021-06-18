// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export interface SmallClient {
//   id: number;
//   nome: string;
// }

// export type ClientDocument = Client & Document;

// @Schema()
// export class Client {
//   @Prop()
//   id: number;

//   @Prop()
//   nome: string;

//   @Prop()
//   cnpj: string;

//   @Prop()
//   ie: string;

//   @Prop()
//   email: string;

//   @Prop()
//   fone: string;
// }

// export const ClientSchema = SchemaFactory.createForClass(Client);

import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'clients' })
export class Client {
  @ObjectIdColumn()
  id: number;

  @Column({
    type: 'string',
  })
  nome: string;

  @Column({
    type: 'string',
  })
  cnpj: string;

  @Column({
    type: 'string',
  })
  ie: string;

  @Column({
    type: 'string',
  })
  email: string;

  @Column({
    type: 'string',
  })
  fone: string;
}
