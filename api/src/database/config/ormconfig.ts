export function mongoConfig(): string {
  if (!process.env.DATABASE_HOST) {
    return `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
  } else {
    return 'mongodb+srv://root:root@link-api.clm98.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  }
}

export function ormConfig(): any {
  return {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    entities: ['dist/**/entity/*.entity.js'],
    cli: {
      entitiesDir: 'src/components/**/entity',
    },
  };
}
