// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, UnorderedMap, UnorderedSet, initialize } from 'near-sdk-js';

@NearBindgen({})
class VotingContract {

  //Candidate Pair used to store Candidate Names and URL Links
  candidatePair = new UnorderedMap<string[]>("candidatePair");

  //prompt set
  promptSet = new UnorderedSet<string>("promptArray");

  //voteArray value stored in Map
  voteArray = new UnorderedMap<number[]>("voteArray")
  
  //Keep track of user participation
  userParticiptaion = new UnorderedMap<string[]>("userParticipation")

 //Call Methods


 @call({})
 addCandidatePair({
  prompt, 
  name1, 
  name2, 
  url1, 
  url2 }:
  {prompt: string;
  name1:string;
  name2: string;
  url1: string;
  url2: string;
}){
    this.candidatePair.set(prompt, [name1,url1,name2,url2]);
  }


  @call({})
  initializeVotes({prompt}: {prompt:string}){
    this.voteArray.set(prompt,[0,0]);
  }

  @call({})
  addToPromptArray({prompt}: {prompt: string}){
    this.promptSet.set(prompt);
  }

  @call({})
  clearPromptArray(){
    this.promptSet.clear();
    this.candidatePair.clear();
    this.userParticiptaion.clear();
    this.voteArray.clear();
    near.log("clearing poll");
  }

  @call({})
  addVote({prompt, index}: {prompt: string; index:number}){
    let currentVotes = this.voteArray.get(prompt,{defaultValue:[0,0]});
    currentVotes[index] = currentVotes[index]+1;
    this.voteArray.set(prompt, currentVotes);
  }

  @call({})
  recordUser({prompt,user}:{prompt:string, user:string}){
    let currentArray = this.userParticiptaion.get(prompt, {defaultValue:[]});
    currentArray.includes(user)?null: currentArray.push(user);
    this.userParticiptaion.set(prompt, currentArray);
  }

 // @view({}) // This method is read-only and can be called for free
//get_greeting(): string {
  //  return this.message;
  //}


  //View Methods 
  @view({})
  getUrl({prompt, name}: {prompt: string; name:string}): string{near.log(prompt);
    near.log(prompt);
    let candidateArray = this.candidatePair.get(prompt);
    //[name1, url1, name2, url2]
    return candidateArray[candidateArray.indexOf(name)+1];
  }


  @view({})
  didParticipate({prompt, user}: {prompt: string; user:string}):boolean{
    let promptUserlist:string[]= this.userParticiptaion.get(prompt,{
      defaultValue: [],
    });
    return promptUserlist.includes(user);
  }

  @view({})
  participaationArray({prompt}: {prompt: string}): string[]{
    return this.userParticiptaion.get(prompt);
  }

  @view({})
  getAllPrompts():string[]{
    return this.promptSet.toArray();
  }


  @view({})
  getVotes({prompt}: {prompt: string}): number[]{
    return this.voteArray.get(prompt, {defaultValue: []});
  }


  @view({})
  getCandidatePair({prompt}: {prompt:string}):string[]{
    let candidateArray = this.candidatePair.get(prompt,{
      defaultValue:["n/a", "n/a", "n/a", "n/a"], 
    });
    return [candidateArray[0], candidateArray[2]];
  }
  //@call({}) // This method changes the state, for which it cost gas
  //set_greeting({ message }: { message: string }): void {
    //near.log(`Saving greeting ${message}`);
    //this.message = message;
  //}
}