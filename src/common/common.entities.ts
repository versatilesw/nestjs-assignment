import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class ResponseWithoutData {
    @ApiProperty()
    status: number;
    message: string;
}

export class ResponseWithData extends ResponseWithoutData {
    data?: any;
}
