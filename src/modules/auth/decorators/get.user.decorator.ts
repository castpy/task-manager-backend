import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
  async (_data, context: ExecutionContext): Promise<any> => {
    const req = context.switchToHttp().getRequest();
    if (req.user) {
      return req.user;
    }
  },
);
