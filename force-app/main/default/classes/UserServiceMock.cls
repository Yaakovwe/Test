@isTest
public class UserServiceMock implements HttpCalloutMock {
    // Implement this interface method
    public HTTPResponse respond(HTTPRequest req) {
        // Optionally, only send a mock response for a specific endpoint
        // and method.
        System.assertEquals('https://randomuser.me/api/?results=10', req.getEndpoint());
        System.assertEquals('GET', req.getMethod());
        
        // Create a fake response
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody(responseString());
        res.setStatusCode(200);
        return res;
    }

    public String responseString(){
        String response = '{"results":[{"gender":"female","name":{"title":"Ms","first":"Elsa","last":"Kalas"},"location":{"street":{"number":7650,"name":"Reijolankatu"},' +
        '"city":"Oulunsalo","state":"North Karelia","country":"Finland","postcode":99367,"coordinates":{"latitude":"-25.3556","longitude":"126.6759"},"timezone":' +
        '{"offset":"+9:00","description":"Tokyo, Seoul, Osaka, Sapporo, Yakutsk"}},"email":"elsa.kalas@example.com",' +
        '"login":{"uuid":"23beca95-f59b-4b41-b39f-806721aed2be","username":"yellowleopard110","password":"meow","salt":"wKSRphSm","md5":"1d6a1c5617fdead560c4a7eefe94ba60",' +
        '"sha1":"2fdd631badfa9786d05e6cd460b20de94b6719a1","sha256":"b6e2d79472478218622818de70b816e62c6bb2e0f723551983760d7ba65fe60e"},' +
        '"dob":{"date":"1967-02-21T06:04:02.300Z","age":56},"registered":{"date":"2011-12-21T01:45:54.991Z","age":11},"phone":"02-698-178","cell":"045-373-48-60",' +
        '"id":{"name":"HETU","value":"NaNNA760undefined"},"picture":{"large":"https://randomuser.me/api/portraits/women/12.jpg",' +
        '"medium":"https://randomuser.me/api/portraits/med/women/12.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/12.jpg"},' +
        '"nat":"FI"},{"gender":"male","name":{"title":"Mr","first":"Winfried","last":"Bielefeld"},"location":{"street":{"number":8571,"name":"Lindenweg"},' +
        '"city":"Meyenburg","state":"Hessen","country":"Germany","postcode":27318,"coordinates":{"latitude":"15.1927","longitude":"-53.9410"},"timezone":' +
        '{"offset":"+9:00","description":"Tokyo, Seoul, Osaka, Sapporo, Yakutsk"}},"email":"winfried.bielefeld@example.com","login":' +
        '{"uuid":"b56c90bb-133f-40dd-9863-784eafa9ac06","username":"silverbear465","password":"oracle","salt":"DIp3Q9QL","md5":"ac74cd683fb37fa0d52b708e0d649356",' +
        '"sha1":"12214dfbcf4ac87323f2477728acd01e7588a7b6","sha256":"6e7023a76ccdcedf9bbae6971ad481f4f90424d525fe09f32cac60e9a4e571d7"},' +
        '"dob":{"date":"1982-12-08T14:42:20.165Z","age":40},"registered":{"date":"2021-05-15T18:24:44.943Z","age":1},"phone":"0690-1100092","cell":"0170-6343994",'+
        '"id":{"name":"SVNR","value":"71 081282 B 101"},"picture":{"large":"https://randomuser.me/api/portraits/men/78.jpg","medium":' +
        '"https://randomuser.me/api/portraits/med/men/78.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/78.jpg"},"nat":"DE"}],' +
        '"info":{"seed":"f0849a525d2ff203","results":10,"page":1,"version":"1.4"}}';
        return response;
    }
}