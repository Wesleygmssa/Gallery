import { useState, useEffect } from "react";
import * as C from "./App.styles";
import * as Photos from "./services/photos";
import { Photo } from "./types/Photo";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      const photos = await Photos.getAll();
      setPhotos(photos);
      setLoading(false);
    };
    getPhotos();
  }, []);
  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de fotos</C.Header>

        {loading && (
          <C.Loading>
            <div className="emoji">🚀</div>
            <div>Carregando...</div>
          </C.Loading>
        )}

        {!loading && photos.length > 0 && (
          <C.PhotoList>
            {photos.map((photo, index) => (
              <div>{photo.name}</div>
              // <C.Photo key={photo.name}>
              //   <C.PhotoName>{photo.name}</C.PhotoName>
              //   <C.PhotoImage src={photo.url} />
              // </C.Photo>
            ))}
          </C.PhotoList>
        )}

        {!loading && photos.length === 0 && (
          <C.Loading>
            <div className="emoji">😢</div>
            <div>Nenhuma foto encontrada</div>
          </C.Loading>
        )}
      </C.Area>
    </C.Container>
  );
};

export default App;
