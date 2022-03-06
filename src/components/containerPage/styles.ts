import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    background: whitesmoke;
    display: table;
    width: 100%;
    height: 100%;
    min-height: 900px;
    margin-left: auto;
    margin-right: auto;
    max-width: 3000px;
    max-height: 3000px;
`;

export const HeaderContainer = styled.div`
    background: #00CE73;
    display: flex;
    align-items: center;
    height: 5.5rem;
    justify-content: space-around;
    border-bottom: 2px solid #f1f1f1;
    top: 0;
    left: 0;
`;

export const Home = styled.div`
    border-radius: 10px;
    background: whitesmoke;
    height: auto;
    padding-top: 30px;
    padding-bottom: 15px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
`;

export const Data = styled.div`
    width: 75%;
    height: 50%;
    margin-top: 4%;
    padding-bottom: 35px;
    margin-bottom: 30%;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    justify-content: center;
    min-width: 18rem;
`;

export const UserContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background: white;
    width: 6.5rem;
    height: 2.5rem;
    border-radius: 7px;
    box-shadow: 0 16px 22px -16px rgb(15 50 86 / 32%);
    padding: 3px;
`;