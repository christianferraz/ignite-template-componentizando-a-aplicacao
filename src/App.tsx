import { useEffect, useState } from 'react';
import { api } from './services/api';
import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';
import { Content } from './components/Content'
import { SideBar } from './components/SideBar'
import { GenreResponseProps } from './interfaces/GetGenreProps'

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1)
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);


  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar handleClickButton={handleClickButton} selectedGenreId={ selectedGenreId }/>
      <Content selectedGenre={selectedGenre} selectedGenreId={selectedGenreId} />
    </div>
  )
}