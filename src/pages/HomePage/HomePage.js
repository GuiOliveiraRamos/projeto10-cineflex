import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function HomePage() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const request = axios.get(
      "https://mock-api.driven.com.br/api/v8/cineflex/movies"
    );

    request.then((resposta) => {
        console.log(resposta.data)
      setFilmes(resposta.data);
    });
  }, []);
  if (filmes.length === 0) {
    return <p>Carregando...</p>;
  }
  return (
    <PageContainer>
      Selecione o filme
      <ListContainer>
        <MovieContainer>
          {filmes.map((filme) => (
            <div key={filme.id}>
              <img src={filme.posterURL} alt={filme.title} />
              <p>{filme.title}</p>
              <p>{filme.overview}</p>
              <p>Release date: {filme.releaseDate}</p>
            </div>
          ))}
        </MovieContainer>

        <MovieContainer>
          <img
            src={
              "https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"
            }
            alt="poster"
          />
        </MovieContainer>

        <MovieContainer>
          <img
            src={
              "https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"
            }
            alt="poster"
          />
        </MovieContainer>

        <MovieContainer>
          <img
            src={
              "https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"
            }
            alt="poster"
          />
        </MovieContainer>
      </ListContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-top: 70px;
`;
const ListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`;
const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  img {
    width: 130px;
    height: 190px;
  }
`;
