import { CreateTrackDto } from './create-track.dto';
declare const UpdateTrackDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTrackDto>>;
export declare class UpdateTrackDto extends UpdateTrackDto_base {
    name?: string;
    artistId?: string | null;
    albumId?: string | null;
    duration?: number;
}
export {};
