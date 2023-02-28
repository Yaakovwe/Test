@isTest
private class CalloutClassTest {
     @isTest static void testCallout() {
        // Set mock callout class 
        Test.setMock(HttpCalloutMock.class, new UserServiceMock());
        
        // Call method to test.
        // This causes a fake response to be sent
        // from the class that implements HttpCalloutMock. 
        HttpResponse res = CalloutClass.getInfoFromExternalService();
        
        // Verify response received contains fake values
        String contentType = res.getHeader('Content-Type');
        System.assert(contentType == 'application/json');
        String actualValue = res.getBody();
        String expectedValue = new UserServiceMock().responseString();
        System.assertEquals(actualValue, expectedValue);
        System.assertEquals(200, res.getStatusCode());
    }
}