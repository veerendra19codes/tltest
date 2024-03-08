// pages/api/getUser.js
import { connectToDB } from '@/lib/connectToDB';
import { User } from '@/lib/models';

export default async function GET(req, res) {
  try {
    await connectToDB();

    // Assuming you pass the user ID as a query parameter
    const userId = req.query.id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
