import React from 'react';
import { Button } from "../ui/button";

const SuggestionButton = ({ suggestion, onClick }) => {
  return (
    <Button
      variant="outline"
      className="bg-white shadow-md hover:shadow-lg rounded-full text-sm text-gray-700 font-normal transition-all px-4"
      onClick={() => onClick(suggestion)}
    >
      {suggestion} →
    </Button>
  );
};

export default SuggestionButton;