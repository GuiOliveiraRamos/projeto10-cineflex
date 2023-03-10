import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

export default function HomePage() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const request = axios.get(
      "https://mock-api.driven.com.br/api/v8/cineflex/movies"
    );

    request.then((resposta) => {
      console.log(resposta.data);
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
        {filmes.map((filme) => (
          <Link to={`/sessoes/${filme.id}`}>
            <MovieContainer>
              <div data-test="movie" key={filme.id}>
                <img src={filme.posterURL} alt={filme.title} />
              </div>
            </MovieContainer>
          </Link>
        ))}
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
