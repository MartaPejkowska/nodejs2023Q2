import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { FavouriteEntity } from 'src/favourites/entities/favourite.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { UserEntity } from 'src/users/entity/user.entity';

export const users: UserEntity[] = [
    // {
    //     id: '1197d507-8f1d-47e6-805a-7679b9cd19a0',
    //     login: 'Marta',
    //     password: 'password',
    //     version: 1,
    //     createdAt: BigInt(1690372436970),
    //     updatedAt: BigInt(1690372458913),
    // },
];
export const artists: ArtistEntity[] = [
    {
        id: '1197d507-8f1d-47e6-805a-7679b9cd19ab',
        name: 'Eminem',
        grammy: true,
    },
    {
        id: '60bd397a-0cc8-498f-80b0-81329066c7cc',
        name: 'Dermot Kennedy',
        grammy: false,
    },
];
export const tracks: TrackEntity[] = [
    {
        id: 'f394fa38-9322-47d1-9c1e-6e18c5df3291', // uuid v4
        name: 'Lose yourself',
        artistId: '1197d507-8f1d-47e6-805a-7679b9cd19ab', // refers to Artist
        albumId: 'a4b6a8f4-8392-4331-bf99-10f7c39d5772', // refers to Album
        duration: 300,
    },
    {
        id: '2719c6b9-2a6d-4b7d-9848-00b08c698325', // uuid v4
        name: 'Till I collapse',
        artistId: '1197d507-8f1d-47e6-805a-7679b9cd19ab', // refers to Artist
        albumId: '4d3430c9-06d4-4939-af09-ac8e383c6558', // refers to Album
        duration: 260,
    },
    {
        id: 'db2819d3-74ce-4d1c-818b-ad6e104ccca0', // uuid v4
        name: 'The Corner',
        artistId: '60bd397a-0cc8-498f-80b0-81329066c7cc', // refers to Artist
        albumId: '87850bdd-467b-40d5-86a0-ae8ffa803715', // refers to Album
        duration: 200,
    },
];
export const albums: AlbumEntity[] = [
    {
        id: 'a4b6a8f4-8392-4331-bf99-10f7c39d5772', // uuid v4
        name: '8 Mile O.S.T.',
        year: 2002,
        artistId: '1197d507-8f1d-47e6-805a-7679b9cd19ab',
    },
    {
        id: '4d3430c9-06d4-4939-af09-ac8e383c6558', // uuid v4
        name: 'The Eminem Show',
        year: 2002,
        artistId: '1197d507-8f1d-47e6-805a-7679b9cd19ab',
    },
    {
        id: '87850bdd-467b-40d5-86a0-ae8ffa803715',
        name: 'Without Fear',
        year: 2019,
        artistId: '60bd397a-0cc8-498f-80b0-81329066c7cc',
    },
];
export const favourites: FavouriteEntity = {
    artists: [],
    albums: [],
    tracks: [],
};
