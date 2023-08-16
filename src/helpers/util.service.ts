import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class UtilService {
  createPasswordHash(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}
