import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 11% auto;
  width: fit-content;
  min-width: 30rem;
  min-height: 50%;
  background-color: white;
  column-gap: 12px;
  padding: 0.7rem 1.15rem 1.3rem 1.15rem;
  font-size: 15px;
  justify-content: center;
  box-shadow: 1px 1px 5px 0px rgb(0 0 0 / 20%);
  margin-bottom: 9px;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 16px 22px -16px rgb(15 50 86 / 32%);
`;

export const ContainerIcon = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ContainerData = styled.div`
  padding: 8%;
  display: grid;
  row-gap: 1rem;
`;
