public with sharing class UserService {
    @AuraEnabled
    public static string getRandomUsers(){
        try{
            Http http = new Http();
            HttpRequest req = new HttpRequest();
            String endpoint = 'https://randomuser.me/api/?results=10';
            req.setEndpoint(endpoint);
            req.setMethod('GET');
            req.setHeader('Content-Type', 'application/json');
            
            HttpResponse res = http.send(req);
            System.debug( 'test ' + res.getBody());
            return res.getBody();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}