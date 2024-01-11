app.get("/orderlist", async (req, res) => {
  const email = req.query.email;
  const query = { email: email };
  const cursor = orderCollection.find(query);
  const allOrder = await cursor.toArray();
  res.send(allOrder);
});
