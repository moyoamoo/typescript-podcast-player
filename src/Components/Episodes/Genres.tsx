import { formatGenres } from "../utils";

const Genres = ({ genres }: { genres: string[] | undefined }) => {
  let formattedGenres: string[] = [];
  if (genres) {
    formattedGenres = formatGenres(genres);
  }

  return (
    <>
      {genres && (
        <div className="genres">
          {formattedGenres.map((genre) => {
            return (
              <p key={genre} className="genre">
                {genre}
              </p>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Genres;
