import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PropertyDetailsScreen from './screens/PropertyDetailsScreen';
import ChatScreen from './screens/ChatScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import VirtualTourScreen from './screens/VirtualTourScreen';
import ValuationScreen from './screens/ValuationScreen';
import PaymentScreen from './screens/PaymentScreen';
import SearchScreen from './screens/SearchScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import SmartHomeScreen from './screens/SmartHomeScreen';
import VirtualStagingScreen from './screens/VirtualStagingScreen';
import SocialShareScreen from './screens/SocialShareScreen';
import LoginScreen from './screens/LoginScreen';
import LoyaltyProgramScreen from './screens/LoyaltyProgramScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import AdvertisementScreen from './screens/AdvertisementScreen';
import PartnershipScreen from './screens/PartnershipScreen';
import TransactionScreen from './screens/TransactionScreen';
import LocalizationScreen from './screens/LocalizationScreen';
import ComplianceScreen from './screens/ComplianceScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import UpdateScreen from './screens/UpdateScreen';
import UserPreferencesScreen from './screens/UserPreferencesScreen';
import RecommendationsScreen from './screens/RecommendationsScreen';
import ForumsScreen from './screens/ForumsScreen';
import DiscussionsScreen from './screens/DiscussionsScreen';
import EventsScreen from './screens/EventsScreen';
import SupportTicketsScreen from './screens/SupportTicketsScreen';
import FAQsScreen from './screens/FAQsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'RealtyVerse',
              headerLeft: () => (
                <Image
                  source={require('./assets/icon.png')}
                  style={{ width: 40, height: 40, marginLeft: 10 }}
                />
              ),
            }}
          />
          <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} options={{ title: 'Property Details - RealtyVerse' }} />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat - RealtyVerse' }} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications - RealtyVerse' }} />
          <Stack.Screen name="VirtualTour" component={VirtualTourScreen} options={{ title: 'Virtual Tour - RealtyVerse' }} />
          <Stack.Screen name="Valuation" component={ValuationScreen} options={{ title: 'Valuation - RealtyVerse' }} />
          <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment - RealtyVerse' }} />
          <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search - RealtyVerse' }} />
          <Stack.Screen name="Reviews" component={ReviewsScreen} options={{ title: 'Reviews - RealtyVerse' }} />
          <Stack.Screen name="Chatbot" component={ChatbotScreen} options={{ title: 'Chatbot - RealtyVerse' }} />
          <Stack.Screen name="SmartHome" component={SmartHomeScreen} options={{ title: 'Smart Home - RealtyVerse' }} />
          <Stack.Screen name="VirtualStaging" component={VirtualStagingScreen} options={{ title: 'Virtual Staging - RealtyVerse' }} />
          <Stack.Screen name="SocialShare" component={SocialShareScreen} options={{ title: 'Social Share - RealtyVerse' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login - RealtyVerse' }} />
          <Stack.Screen name="LoyaltyProgram" component={LoyaltyProgramScreen} options={{ title: 'Loyalty Program - RealtyVerse' }} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ title: 'Subscription - RealtyVerse' }} />
          <Stack.Screen name="Advertisement" component={AdvertisementScreen} options={{ title: 'Advertisement - RealtyVerse' }} />
          <Stack.Screen name="Partnership" component={PartnershipScreen} options={{ title: 'Partnership - RealtyVerse' }} />
          <Stack.Screen name="Transaction" component={TransactionScreen} options={{ title: 'Transaction - RealtyVerse' }} />
          <Stack.Screen name="Localization" component={LocalizationScreen} options={{ title: 'Localization - RealtyVerse' }} />
          <Stack.Screen name="Compliance" component={ComplianceScreen} options={{ title: 'Compliance - RealtyVerse' }} />
          <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'Feedback - RealtyVerse' }} />
          <Stack.Screen name="Update" component={UpdateScreen} options={{ title: 'Update - RealtyVerse' }} />
          <Stack.Screen name="UserPreferences" component={UserPreferencesScreen} options={{ title: 'User Preferences - RealtyVerse' }} />
          <Stack.Screen name="Recommendations" component={RecommendationsScreen} options={{ title: 'Recommendations - RealtyVerse' }} />
          <Stack.Screen name="Forums" component={ForumsScreen} options={{ title: 'Forums - RealtyVerse' }} />
          <Stack.Screen name="Discussion" component={DiscussionsScreen} options={{ title: 'Discussion - RealtyVerse' }} />
          <Stack.Screen name="Events" component={EventsScreen} options={{ title: 'Events - RealtyVerse' }} />
          <Stack.Screen name="SupportTickets" component={SupportTicketsScreen} options={{ title: 'Support Tickets - RealtyVerse' }} />
          <Stack.Screen name="FAQs" component={FAQsScreen} options={{ title: 'FAQs - RealtyVerse' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;