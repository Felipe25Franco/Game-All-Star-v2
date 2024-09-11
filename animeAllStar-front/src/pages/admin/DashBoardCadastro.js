import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import '../../styles/pages/admin/DashBoardCadastro.css'



function DashBoardCadastro() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <Grid container spacing={3}>
        {/* Card 1: Cadastrar */}
        <Grid item xs={12} sm={4}>
          <Card className="dashboard-card" onClick={() => navigate('/mundosAdmin')}>
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
          <Card className="dashboard-card" onClick={() => navigate('/itensAdmin')}>
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
        {/* Card 1: Cadastrar */}
        <Grid item xs={12} sm={4}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h5" component="div" className="dashboard-card-title">
                Mundos
              </Typography>
              <Typography variant="body2" className="dashboard-card-description">
                Editar Mundos cadastrados no sistema.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" className="dashboard-button">
                Editar
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Card 2: Editar */}
        <Grid item xs={12} sm={4}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h5" component="div" className="dashboard-card-title">
                Editar
              </Typography>
              <Typography variant="body2" className="dashboard-card-description">
                Edite um item existente no sistema.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" className="dashboard-button">
                Editar
              </Button>
            </CardActions>
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