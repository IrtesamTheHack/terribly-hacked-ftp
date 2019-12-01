package ftp_server;
import java.awt.Desktop;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

public class Fileloader {
    public static void main(String[] args) throws IOException {
        //text file, should be opening in default text editor
         String DOWNLOAD_PATH = "F:\\Google Drive\\COMSATS University Islamabad\\Semester 5\\" +
                "CSC 339 Data Communication and Networks\\Lab\\FTPServer\\ReceivedFiles\\";
        File file = new File(DOWNLOAD_PATH);
        if (!file.exists()){
            file.mkdir();
        }
        else{
            Desktop.getDesktop().open(file);
        }




    }

    private static String currDir() {

        StringBuffer output = new StringBuffer();

        Process p;

        try {
            p = Runtime.getRuntime().exec("cd");
            p.waitFor();
            BufferedReader reader =
                    new BufferedReader(new InputStreamReader(p.getInputStream()));

            String line = "";
            while ((line = reader.readLine())!= null) {
                output.append(line);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return output.toString();

    }


}
