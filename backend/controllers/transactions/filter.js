const { categories } = require('../../services');

const { transactions: service } = require('../../services');

const filter = async (req, res, next) => {
  const { _id: id } = req.user;
  const { month, year } = req.query;

  if (!year) {
    res.status(400).json({
      status: 'bad request',
      code: 400,
      message: 'Year is required',
    });
    return;
  }

  try {
    const categoriesList = await categories.getAll();

    const transactions = await service.getFilteredTransactions(
      id,
      +month,
      +year
    );

    const income = transactions.reduce((acc, item) => {
      return item.transactionType === 'deposit' ? (acc += item.amount) : acc;
    }, 0);

    const totalCost = +transactions
      .reduce((acc, item) => {
        return item.transactionType === 'withdrawal'
          ? (acc += item.amount)
          : acc;
      }, 0)
      .toFixed(2);

    const filteredCosts = categoriesList.map((category) => {
      const sum = transactions.reduce((acc, item) => {
        return item.category + '' === category.id &&
          item.transactionType === 'withdrawal'
          ? (acc += item.amount)
          : acc;
      }, 0);

      return { category: category.name, amount: sum };
    });

    res.json({
      status: 'success',
      code: 200,
      data: {
        filteredCosts,
        income,
        totalCost,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = filter;
