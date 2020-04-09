import crypto from 'crypto';
import connection from '../database/connection';

class OngController {
  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  }

  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    const ongAlreadyExist = await connection('ongs')
      .select('*')
      .where(function () {
        this.where('id', id).orWhere('email', email).orWhere('name', name);
      });

    if (ongAlreadyExist.length) {
      return res.status(400).json({ error: 'Ong já existe' });
    }

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.json({ id });
  }
}

export default new OngController();
