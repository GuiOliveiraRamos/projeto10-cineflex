import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import React from "react";

export default function SessionsPage() {
  const [sessoes, setSessoes] = useState([]);
  const { idSessao } = useParams();

  useEffect(() => {
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idSessao}/showtimes`;
    const request = axios.get(url);

    request.then((resposta) => {
      console.log(resposta.data);
      setSessoes(resposta.data);
    });
  }, []);
  if (sessoes.length === 0) {
    return <p>Carregando...</p>;
  }

  return (
    <PageContainer>
      Selecione o horário
      {sessoes.days.map((d) => (
        <div data-test="movie-day" key={d.id}>
          <SessionContainer>
            <div>
              {d.weekday} - {d.date}
            </div>
            <ButtonsContainer>
              {d.showtimes.map((h) => (
                <Link to={`/assentos/${h.id}`}>
                  <button data-test="showtime" key={h.id}>
                    {h.name}
                  </button>
                </Link>
              ))}
            </ButtonsContainer>
          </SessionContainer>
        </div>
      ))}
      <FooterContainer data-test="footer">
        <div data-test="footer">
          <img key="img" src={sessoes.posterURL} alt={sessoes.title} />
        </div>
        <div data-test="footer">
          <p>{sessoes.title}</p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 5px;
  }
`;
const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  padding-top: 10px;
  button {
    margin-right: 20px;
  }
  a {
    text-decoration: none;
  }
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
