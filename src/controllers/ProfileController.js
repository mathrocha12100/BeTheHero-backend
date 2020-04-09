import connection from '../database/connection';

class ProfileController {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    const incidents = await connection('incidents')
      .select('*')
      .where('ong_id ', ong_id);

    if (!incidents) {
      return res.status(400).json({ error: 'Não existem incidentes' });
    }

    return res.json(incidents);
  }
}

export default new ProfileController();
