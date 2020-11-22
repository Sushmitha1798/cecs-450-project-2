package eyeMovement;
/*
 * Copyright (c) 2013, Bo Fu 
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import java.io.File;
import java.io.IOException;


public class main {
	
	public static void main(String args[]) throws IOException{
		
		//specify the location of the raw data files
		String inputURL = "/Users/adamhinkle/Downloads/Archive/";
		//specify the location of the analyzed results 
		String outputURL = "/Users/adamhinkle/Documents/450proj2/data/";
		//specify the subject, e.g. p1, as analysis is generated per-participant
		int [] confTree_bioGraph = {1,3,5,7,11,13,15,17,19,21,23,25,27,31,33,35};
		int [] confGraph_bioTree = {2,4,6,10,12,14,16,18,20,24,28,30,32,34,36};
		generate(confTree_bioGraph, true, inputURL,outputURL);
		generate(confGraph_bioTree, false, inputURL,outputURL);
		
	}
	//altered main to organize json output by ontology and by tree vs graph --- Adam Hinkle
	public static void generate(int [] group, boolean isGroup1, String inputURL, String outputURL) throws IOException {
		String treeResultsOutput = outputURL;
		String graphResultsOutput = outputURL;
		if (isGroup1) {
			treeResultsOutput += "confTree/";
			graphResultsOutput += "bioGraph/";
		}
		else {
			graphResultsOutput += "confGraph/";
			treeResultsOutput += "bioTree/";
		}
		File f1 = new File(treeResultsOutput);
		f1.mkdir();
		File f2 = new File(graphResultsOutput);
		f2.mkdir();
		for (int participantNum: group) {
			String participant = "p" + participantNum;
			String currentTreeOutput = treeResultsOutput + participant;
			String currentGraphOutput = graphResultsOutput + participant;
//			File f3 = new File(currentTreeOutput);
//			f3.mkdir();
//			File f4 = new File(currentGraphOutput);
//			f4.mkdir();
			String inputLocation = inputURL + participant + "/";

			//FXD data
			//testing cases where X axis values are the same
			//String fixationData = "fxdSameXValues.txt";
			String treeFixation = participant + ".treeFXD.txt";
	        String treeFixationResults = "treeFXDResults.txt";
			String treeFixationInput = inputLocation + treeFixation;
	        String treeFixationOutput = currentTreeOutput + treeFixationResults; 
	        
	        String graphFixation = participant + ".graphFXD.txt";
	        String graphFixationResults = "graphFXDResults.txt";
	        String graphFixationInput = inputLocation + graphFixation;
	        String graphFixationOutput = currentGraphOutput + graphFixationResults;
			
			//EVD data
			String treeEvent = participant + ".treeEVD.txt";
			String treeEventResults = "treeEVDResults.txt";
			String treeEventInput = inputLocation + treeEvent;
	        String treeEventOutput = currentTreeOutput + treeEventResults;
	        
	        String graphEvent = participant + ".graphEVD.txt";
	        String graphEventResults = "graphEVDResults.txt";
	        String graphEventInput = inputLocation + graphEvent;
	        String graphEventOutput = currentGraphOutput + graphEventResults;
	        
	        //GZD data
	        String gazeBaseline = participant + "GZD.txt";
	        String baselineResults = "baselineResults.txt";
	        String baselineInput = inputLocation + gazeBaseline;
	        String baselineOutput = outputURL + participant + baselineResults;
	        
	        String treeGaze = participant + ".treeGZD.txt";
	        String treeGazeResults = "treeGZDResults.txt";
	        String treeGazeInput = inputLocation + treeGaze;
	        String treeGazeOutput = currentTreeOutput + treeGazeResults;
	        
	        String graphGaze = participant + ".graphGZD.txt";
	        String graphGazeResults = "graphGZDResults.txt";
	        String graphGazeInput = inputLocation + graphGaze;
	        String graphGazeOutput = currentGraphOutput + graphGazeResults;
	        
	        //analyze gaze baseline
	        gaze.processGaze(baselineInput, baselineOutput);
	        
	        //analyze tree related data
	        fixation.processFixation(treeFixationInput, treeFixationOutput,currentTreeOutput,participantNum,true);
	        event.processEvent(treeEventInput, treeEventOutput);
	        gaze.processGaze(treeGazeInput, treeGazeOutput);
	        
	        //analyze graph related data
	        fixation.processFixation(graphFixationInput, graphFixationOutput,currentGraphOutput,participantNum,false);
	        event.processEvent(graphEventInput, graphEventOutput);
	        gaze.processGaze(graphGazeInput, graphGazeOutput);
		}
	}
}
