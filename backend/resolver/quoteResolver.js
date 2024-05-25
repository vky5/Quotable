import Quote from '../model/quoteModel.js';

export const quoteResolver = async (_, args, context) => {
    if (!context.id) {
        throw new Error('You are not logged in');
    }

    // Rest of your resolver logic here
    console.log("User is authenticated, context:", context);
    // Example operation:
    // const quotes = await QuoteModel.find({ userId: context.id });
    // return quotes;

    return "Your operation result here";  // Replace with actual logic
};
