'use client'

import { useEffect, useState } from 'react'
import { Card, Col, Row, Button } from 'react-bootstrap'
import apiFilmes from '../apis/apiFilmes'
import Pagina from '../components/Pagina'

export default function page() {

  const [filmes, setFilmes] = useState([])

  // Fazer algo quando iniciar o componente
  useEffect(() => {
    // Buscar os filmes
    buscarFilmes()
  }, [])

  async function buscarFilmes() {
    const resultado = await apiFilmes.get("/movie/popular?language=pt-BR")
    console.log(resultado.data.results)
    const filmesRecebidos = resultado.data.results
    setFilmes(filmesRecebidos)
  }

  return (
    <Pagina titulo="Filmes">
      <Row>
        {filmes.map((filme, index) => {
          return (
            <Col key={index} xs={12} sm={6} md={3} className="mb-4">
              <Card style={{ height: '100%' }}>
                <Card.Img variant="top" src={"http://image.tmdb.org/t/p/w500/" + filme.poster_path} />
                <Card.Body>
                  <Card.Title>{filme.title}</Card.Title>
                  <Card.Text>
                    <i className="bi bi-star-fill text-warning"></i> {/* Ícone de estrela do Bootstrap */}
                    {filme.vote_average}⭐
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center border-top">
                  <Button variant="primary">Ver Detalhes</Button>
                </Card.Footer>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Pagina>
  )
}
