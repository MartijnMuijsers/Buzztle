/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package buzztle;

import com.memetix.mst.detect.Detect;
import com.memetix.mst.language.Language;
import com.memetix.mst.translate.Translate;



public class Translation{
  public static void main(String[] args) throws Exception {
    //Replace client_id and client_secret with your own.  
    Translate.setClientId("LuWang50");
    Translate.setClientSecret("7lxAFj6clBnfIMLfX/3RtPBX6aaRMgw8ebk4P8ZbTg4=");
    String text="Als Data Analyst rapporteer je op dienst";
    Language lang = Detect.execute(text);
    String translatedText=text;
    if(lang!=Language.ENGLISH){
        translatedText = Translate.execute(translatedText, lang, Language.ENGLISH);
    }
    System.out.println(lang);
    System.out.println(translatedText);
    /////////////////spelling correction
    
  }
}