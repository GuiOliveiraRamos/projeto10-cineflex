import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

export default function SeatsPage() {
  const { idAssentos } = useParams();
  const [assentos, setAssentos] = useState([]);
  const [assentosSelecionados, setAssentosSelecionados] = useState([]);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate();

  const selecionarAssento = (assento) => {
    if (assento.isAvailable) {
      setAssentosSelecionados([...assentosSelecionados, assento.id]);
    } else {
      alert("Assento já reservado");
    }
  };

  useEffect(() => {
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idAssentos}/seats`;
    const request = axios.get(url);

    request.then((resposta) => {
      console.log(resposta.data);
      setAssentos(resposta.data);
    });
  }, [idAssentos]);

  if (assentos.length === 0) {
    return <p>Carregando...</p>;
  }

  const reservarAssentos = (e) => {
    e.preventDefault();
    const salvarDados = {
      movieTitle: assentos.movie.title,
      sessionDate: `${assentos.day.weekday} - ${assentos.name}`,
      selectedSeats: assentosSelecionados,
      clientName: name,
      clientCPF: cpf,
    };
    const ids = assentosSelecionados;
    const request = axios.post(
      "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",
      { ids, name, cpf }
    );
    request.then(() => navigate("/sucesso", { state: { dados: salvarDados } }));
  };

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {assentos.seats.map((a) => (
          <SeatItem
            key={a.id}
            isAvailable={a.isAvailable}
            isSelected={assentosSelecionados.includes(a.id)}
          >
            <div data-test="seat" onClick={() => selecionarAssento(a)}>
              {a.name}
            </div>
          </SeatItem>
        ))}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle isSelected />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle isAvailable />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer>
        <form onSubmit={reservarAssentos}>
          <label htmlFor="name">Nome do Comprador:</label>
          <input
            type="text"
            data-test="client-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome..."
            required
          />
          <label htmlFor="cpf">CPF do Comprador:</label>
          <input
            type="number"
            maxLength={12}
            data-test="client-cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite seu CPF..."
            required
          />
          <button data-test="book-seat-btn" type="submit">
            Reservar Assento(s)
          </button>
        </form>
      </FormContainer>
      <FooterContainer>
        <div data-test="footer">
          <img src={assentos.movie.posterURL} alt={assentos.movie.title} />
        </div>
        <div>
          <p>{assentos.movie.title}</p>
          <p>{`${assentos.day.weekday} - ${assentos.name}`}</p>
        </div>
      </FooterContainer>
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
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.div`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  border: 1px solid
    ${(props) =>
      props.isSelected ? "#0E7D71" : props.isAvailable ? "#7B8B99" : "#F7C52B"};
  background-color: ${(props) =>
    props.isSelected ? "#1AAE9E" : props.isAvailable ? "#C3CFD9" : "#FBE192"};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatItem = styled.div`
  border: 1px solid
    ${(props) =>
      props.isAvailable
        ? props.isSelected
          ? "#0E7D71"
          : "#808F9D"
        : "#F7C52B"};
  background-color: ${(props) =>
    props.isAvailable ? (props.isSelected ? "#1AAE9E" : "#C3CFD9") : "#FBE192"};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
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
