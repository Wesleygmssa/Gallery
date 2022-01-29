import { useState, useEffect } from "react";
import * as C from "./App.styles";
import * as Photos from "./services/photos";
import { Photo } from "./types/Photo";
import { PhotoItem } from "./components/PhotoItem";
import { isTemplateExpression } from "typescript";

const App: React.FC = () => {
  const [uploading, setUploading] = useState(false);
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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("image") as File;

    if (file && file.size > 0) {
      setUploading(true);
      let result = await Photos.insert(file);
      setUploading(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        let newPhotosList = [...photos]; // copy photos list
        newPhotosList.push(result); // add new photo to list
        setPhotos(newPhotosList); // update photos list
      }
    }
  };
  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de fotos</C.Header>

        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {uploading && "Enviando.."}
        </C.UploadForm>

        {loading && (
          <C.Loading>
            <div className="emoji">🚀</div>
            <div>Carregando...</div>
          </C.Loading>
        )}

        {!loading && photos.length > 0 && (
          <C.PhotoList>
            {photos.map((photo, index) => (
              <PhotoItem
                key={index}
                url={photo.url}
                name={photo.name}
              ></PhotoItem>
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
