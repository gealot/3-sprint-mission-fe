import { ValidityMessageType } from '../lib/constants/validityMessage';

// ky 라이브러리에서 에러 처리를 위해 인터페이스 정의

export interface ErrorResponse {
  message: ValidityMessageType;
  statusCode: number;
  error?: string;
}
