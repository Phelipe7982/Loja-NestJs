import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: '127.0.0.1',
            port: 5432,
            username: 'root',
            password: 'root',
            database: 'loja_db',
            entities: [],
            synchronize: true
        }
    }
}