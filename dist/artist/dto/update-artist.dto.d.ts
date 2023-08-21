import { CreateArtistDto } from './create-artist.dto';
declare const UpdateArtistDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateArtistDto>>;
export declare class UpdateArtistDto extends UpdateArtistDto_base {
    name?: string;
    grammy?: boolean;
}
export {};
