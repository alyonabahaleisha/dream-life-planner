import React from 'react';
import { Button } from "../ui/button";

const SuggestionButton = ({ suggestion, onClick }) => {
  return (
    <Button
      variant="outline"
      className="bg-white py-5 shadow-md hover:shadow-lg rounded-xl text-sm text-gray-700 font-normal transition-all px-4"
      onClick={() => onClick(suggestion)}
    >
      {suggestion} →
    </Button>
  );
};

export default SuggestionButton;