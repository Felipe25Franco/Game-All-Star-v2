import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import '../../styles/pages/admin/DashBoardCadastro.css'

const IMAGES = [
  'https://i.postimg.cc/T3Tw2sgf/Naruto.jpg',
  'https://i.postimg.cc/3xjBhrdx/Bleach.webp',
  'https://i.postimg.cc/qvHLW6BF/One-Piece.jpg'
];

const CRIATURAS_IMAGES = [
  'https://i.postimg.cc/DwcMgc3z/Acnologia.jpg',
  'https://i.postimg.cc/sfBJnCZ8/ignnel.jpg',
  'https://i.postimg.cc/yY1cMqJs/gamabunta.jpg'
];

function DashBoardCadastro() {
  const [backgroundImage, setBackgroundImage] = useState(IMAGES[0]);
  const [criaturasBackgroundImage, setCriaturasBackgroundImage] = useState(CRIATURAS_IMAGES[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage((prev) => {
        const currentIndex = IMAGES.indexOf(prev);
        const nextIndex = (currentIndex + 1) % IMAGES.length;
        return IMAGES[nextIndex];
      });
      setCriaturasBackgroundImage((prev) => {
        const currentIndex = CRIATURAS_IMAGES.indexOf(prev);
        const nextIndex = (currentIndex + 1) % CRIATURAS_IMAGES.length;
        return CRIATURAS_IMAGES[nextIndex];
      });
    }, 5000); 
    
      
    

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <Grid container spacing={3}>
        {/* Card 1: Cadastrar */}
        <Grid item xs={12} sm={4}>
          <Card 
            className="dashboard-card" 
            onClick={() => navigate('/mundosAdminListagem')}
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
          >
            <CardContent>
              <Typography variant="h5" component="div" className="dashboard-card-title">
                Mundos
              </Typography>
              <Typography variant="body2" className="dashboard-card-description">
                Editar Mundos cadastrados no sistema.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2: Editar */}
        <Grid item xs={12} sm={4}>
          <Card className="dashboard-card" onClick={() => navigate('/itensAdminListagem')}>
            <CardContent>
                <Typography variant="h5" component="div" className="dashboard-card-title">
                          Itens
                </Typography>
                <Typography variant="body2" className="dashboard-card-description">
                          Editar Itens cadastrados no sistema.
                </Typography>
            </CardContent>

          </Card>
        </Grid>

        {/* Card 3: Excluir */}
        <Grid item xs={12} sm={4}>
          <Card className="dashboard-card" onClick={() => navigate('/criaturasAdminListagem')}
          style={{ backgroundImage: `url(${criaturasBackgroundImage})`, backgroundSize: 'cover' }}
          >
             <CardContent>
                            <Typography variant="h5" component="div" className="dashboard-card-title">
                                      Criaturas
                            </Typography>
                            <Typography variant="body2" className="dashboard-card-description">
                                      Editar Criaturas cadastrados no sistema.
                            </Typography>
                        </CardContent>
          </Card>
        </Grid>
        {/* Card 1: Cadastrar */}
        <Grid item xs={12} sm={4}>
          <Card className="dashboard-card" onClick={() => navigate('/classesAdminListagem')}>
            <CardContent>
                <Typography variant="h5" component="div" className="dashboard-card-title">
                          Classes
                </Typography>
                <Typography variant="body2" className="dashboard-card-description">
                          Editar Classes cadastradas no sistema.
                </Typography>
            </CardContent>

          </Card>
        </Grid>

        {/* Card 2: Editar */}
        <Grid item xs={12} sm={4}>
          <Card className="dashboard-card" onClick={() => navigate('/classesAdminListagem')}>
            <CardContent>
                <Typography variant="h5" component="div" className="dashboard-card-title">
                    Habilidades
                </Typography>
                <Typography variant="body2" className="dashboard-card-description">
                    Editar Habilidades cadastradas no sistema.
                </Typography>
            </CardContent>

            </Card>
        </Grid>

        {/* Card 3: Excluir */}
        <Grid item xs={12} sm={4}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h5" component="div" className="dashboard-card-title">
                Excluir
              </Typography>
              <Typography variant="body2" className="dashboard-card-description">
                Remova um item do sistema.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" className="dashboard-button">
                Excluir
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}


export default DashBoardCadastro;