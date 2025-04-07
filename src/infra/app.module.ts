import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@/infra/auth/auth.module'
import { HttpModule } from '@/infra/http/http.module'
import { EventsModule } from './events/events.module'
import { EnvModule } from './env/env.module'
import { envSchema } from './env/env'

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		AuthModule,
		HttpModule,
		EnvModule,
		EventsModule,
	],
})
export class AppModule {}
