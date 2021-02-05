interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtistsData {
  artists: { name: string }[];
}

//type alias
type ArtistsResponseType = ArtistsData & ErrorHandling;

//interface
interface IArtistsResponse extends ArtistsData, ErrorHandling {}

let art: ArtistsResponseType;
let iar: IArtistsResponse;