import { merge } from 'lodash';

const all = {
  env: process.env.NODE_ENV,
  port: process.env.PORT ? Number(process.env.PORT) : 8080,
  ip: process.env.IP || '0.0.0.0',
  user_forgot_pass_key: '3ac1194d22d53db7e2425d8f',
  user_sessions: {
    // Token secreto para la encriptación de los JWT
    secret: 'rgdj22qh323gfydda.1ej,pg3dfa.hrjf489dh24a.435.23.scaffolding',
    // Número de días a los que expirará la sesión
    expiration_days: 7,
    // Número máximo de sesiones activas concurrentemente
    max_active_sessions: 4
  }
};

export const config: any = all;