export class CreateAuthorDto {
  name: string;
  biography: string;
  photo: string;  // This will store the photo filename (not the URL)
  booksWritten: number;
  averageRating: number;
}
