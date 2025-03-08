from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from typing import Any, Text, Dict, List

class ActionPropertyRecommendation(Action):

    def name(self) -> Text:
        return "action_property_recommendation"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        location = tracker.get_slot('location')
        price_range = tracker.get_slot('price_range')

        # Perform a search in the database for properties based on location and price range
        # This is a mock response
        properties = [
            {"title": "Beautiful Apartment", "location": location, "price": "150000"},
            {"title": "Luxury Condo", "location": location, "price": "180000"}
        ]

        response = "Here are some properties in {} within the price range {}:\n".format(location, price_range)
        for property in properties:
            response += "{} - ${}\n".format(property['title'], property['price'])

        dispatcher.utter_message(text=response)
        return []